import {defineStore} from 'pinia'
import {nanoid} from "nanoid";
import {Message, MessageStatus} from "./utils.d";
import {MESSAGE, SELECTOR} from "@utils/const";

interface State {
    alertCallbackCollection: Message[],
    alertConfirmationStatus: MessageStatus,
    alertCollection: Message[]
    isMobile: boolean
}

export const useUtilsStore = defineStore('utils', {
    state: (): State => ({
        alertCallbackCollection: [],
        alertConfirmationStatus: {},
        alertCollection: [],
        isMobile: false
    }),

    actions: {
        addAlert(data: Message) {
            const duplicates = this.alertCollection.filter(
                item => data.text === item.text
            ).length;
            if (duplicates) {
                return;
            }
            this.alertCollection.push(data);
            setTimeout(() => {
                this.alertCollection.shift();
            }, 10000);
        },
        addAlertConfirmation({index, key}: { index: number, key: string }) {
            this.alertConfirmationStatus[key] = {
                status: true,
                index: index
            };
        },
        addAlertDiscard({key, index}: { index: number, key: string }) {
            this.alertConfirmationStatus[key] = {
                status: false,
                index: index
            };
        },
        removeAlertCallback(data: number) {
            this.alertCallbackCollection.splice(data, 1);
        },
        removeAlert(key: string) {
            this.removeAlertCallback(
                this.alertConfirmationStatus[key].index
            );
            delete this.alertConfirmationStatus[key];
        },
        awaitConfirmation(data: Message) {
            const key = nanoid();
            const duplicates =
                this.alertCallbackCollection.filter(item => data.text === item.text)
                    .length > 0;
            return new Promise<void>((resolve, reject) => {
                if (duplicates) {
                    return;
                }
                data.key = key;
                this.alertCallbackCollection.push(data);
                const alertContainer = document.getElementById(SELECTOR.ALERT_CONTAINER_ID);
                if (!alertContainer) {
                    throw new Error("Alert component not found");
                }
                alertContainer.addEventListener("click", (event) => {
                    const target = event.target as Element;
                    const targetParent = target.parentNode as Element;
                    if (
                        !target.classList.contains(SELECTOR.ALERT_BUTTON_CLASS_NAME) &&
                        !targetParent?.classList.contains(SELECTOR.ALERT_BUTTON_CLASS_NAME)
                    ) {
                        return;
                    }
                    if (
                        this.alertConfirmationStatus[key] &&
                        this.alertConfirmationStatus[key].status === true
                    ) {
                        this.removeAlert(key);
                        resolve();
                    } else if (
                        this.alertConfirmationStatus[key] &&
                        this.alertConfirmationStatus[key].status === false
                    ) {
                        this.removeAlert(key);
                        reject(MESSAGE.PROMISE_USER_CANCELLED);
                    }
                });
            });
        }

    }
})
