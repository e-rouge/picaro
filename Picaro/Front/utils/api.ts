import {useUtilsStore} from "@stores/utils";
import {Ref, ref} from "vue";

type Method = 'PUT' | 'POST' | 'GET' | 'DELETE'


async function fetchData<FetchT>(route: string, params: RequestInit): Promise<FetchT | null | undefined> {

    return await fetch(
        `/api/data/${route}`,
        params
    )
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status.toString().match(/40[13]/)) {
                location.href = '/#/login'
            }
            throw new Error('Something went wrong')
        })
        .then((responseData: FetchT) => {
            return responseData ?? null
        })
}

export function picFetch<ReturnT>(
    route: string,
    method: Method = 'GET',
    body?: BodyInit,
    callback?: () => void,
    callbackFail?: () => void,
): { data: Ref<ReturnT | null | undefined>, refresh: () => void } | undefined {

    const utilsStore = useUtilsStore()

    const params: RequestInit = {method}
    const data = ref<ReturnT | null>()

    if (body) {
        params.headers = [
            ["Content-Type", "application/json"]
        ]
        params.body = body
    }
    fetchData<ReturnT>(route, params)
        .then((res: ReturnT | null | undefined) => {
            data.value = res
            if (callback) {
                callback()
            }
            utilsStore.addAlert({
                type: "success",
                text: "Saved successfully"
            });
        }).catch((e) => {
        if (callbackFail) {
            callbackFail()
        }
        utilsStore.addAlert({
            type: "error",
            text: `Request failed.  Returned status of ${e as string}`
        });
    })
    return {
        data,
        refresh: () => {
            fetchData<ReturnT>(route, params)
                .then(res => data.value = res)
                .catch(e => console.error(e))
        }
    }
}
