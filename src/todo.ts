export interface Todos {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export function getTodosByCount(url: string, count: number): Promise<Todos> {
  return fetch(url + count.toString())
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return;
      }
      return response.text()
    })
    .then<Todos>((responseText) => {
      if (responseText) return JSON.parse(responseText)
    })
    .then((data) => data)
}
