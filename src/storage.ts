const STORAGE_KEY = "vue3-todo"
import { ItemInterFace } from "./interface"

export const setStorage = (data: ItemInterFace) => {

  let dataList = localStorage[STORAGE_KEY] ? JSON.parse(localStorage[STORAGE_KEY]) : []
  const index = dataList.length && dataList.findIndex((item: ItemInterFace) => item.id && item.id == data.id)

  if (index >= 0) {
    dataList[index] = data;
    localStorage[STORAGE_KEY] = JSON.stringify([...dataList])
  } else {
    localStorage[STORAGE_KEY] = JSON.stringify([...dataList, data])
  }

}
export const getStorage = () => {
  return localStorage[STORAGE_KEY] ? JSON.parse(localStorage[STORAGE_KEY]) : []
}

export const deleteStorage = (id: number) => {
  const dataList = localStorage[STORAGE_KEY] ? JSON.parse(localStorage[STORAGE_KEY]) : [];
  localStorage[STORAGE_KEY] = JSON.stringify(dataList.filter((item: ItemInterFace) => item.id !== id))
}

export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY)
}