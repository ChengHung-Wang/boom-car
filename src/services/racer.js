import { ref } from "vue";

// 帶有 ref(<T>) 或 Ref<T> 的東西要取 value 的話就 variable.value 就可以拿到值
export const canvas = ref();
export const context = ref();

export function init()
{
    // TODO: 開始渲染遊戲畫面（這個時候 canvas, context 才有東西）
}
