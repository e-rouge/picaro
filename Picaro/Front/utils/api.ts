import {useUtilsStore} from "@stores/utils";
import {Ref, ref} from "vue";
import {useRouter} from "vue-router";

type Method = 'PUT' | 'POST' | 'GET' | 'DELETE'

export type FetchParams = {
    method?: Method,
    body?: BodyInit,
    callback?: () => void,
    header?: false | HeadersInit
    callbackFail?: () => void
}

async function fetchData<FetchT>(route: string, params: RequestInit): Promise<FetchT | null | undefined> {
    const router = useRouter()
    return await fetch(
        route,
        params
    )
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status.toString().match(/40[13]/)) {
                router.push({path: '/admin'}).catch(e => console.error(e))
            }
            throw new Error('Something went wrong')
        })
        .then((responseData: FetchT) => {
            return responseData ?? null
        })
}

export function picFetch<ReturnT>(
    route: string,
    fetchParams: FetchParams = {},
): { data: Ref<ReturnT | null | undefined>, refresh: () => void } | undefined {

    const {method, body, callback, callbackFail} = fetchParams
    const utilsStore = useUtilsStore()

    const params: RequestInit = {method: method ?? 'GET'}
    const data = ref<ReturnT | null>()

    if (body) {
        if (fetchParams.header !== false) {
            params.headers = fetchParams.header ?? [
                ["Content-Type", "application/json"]
            ]
        }
        params.body = body
    }
    fetchData<ReturnT>(route, params)
        .then((res: ReturnT | null | undefined) => {
            data.value = res
            if (callback) {
                callback()
            }
            if (params.method !== "GET") {
                utilsStore.addAlert({
                    type: "success",
                    text: "Saved successfully"
                });
            }

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
