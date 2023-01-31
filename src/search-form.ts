import {renderBlock, renderToast} from './lib.js'
type keyType = 'checkin' | 'checkout' | 'price' | 'city'
const arrayNames: keyType[] = ['checkin','checkout','price', 'city']
// import moment from 'moment'

// не удалось победить все ошибки при импорте moment,
// поэтому не много костылей

// @ts-ignore
const getDefaultValue = (date: Date, plusDay: number): Date => moment(date).add(plusDay, 'days').toDate()
// @ts-ignore
const getFormatDate = (date: Date): string => moment(date).format('YYYY-MM-DD')

const getLastDayOfDesiredMonth = (date: Date, plusMount: number): string =>
// @ts-ignore
  moment(date).add(plusMount, 'month').endOf('month').format('YYYY-MM-DD')


export function renderSearchFormBlock(checkin?: Date, checkout?: Date): void {

  const currentDate = new Date()
  const checkinValue = checkin || getDefaultValue(currentDate, 1)
  const checkinDate = getFormatDate(checkinValue)
  const checkoutDate = getFormatDate(checkout || getDefaultValue(checkinValue, 2))
  const minCheckout = getFormatDate(currentDate)
  const maxCheckout = getLastDayOfDesiredMonth(currentDate, 1)

  interface SearchFormData {
    city?: string,
    checkin?: string,
    checkout?: string,
    price?: string,
  }

  function search(value: SearchFormData): void {
    console.log(value)
  }


  renderBlock(
    'search-form-block',
    `
    <form id='searchForm'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text"  value="Санкт-Петербург" name="city"/>
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
<!--          <div class="providers">-->
<!--            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>-->
<!--            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>-->
<!--          </div>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date"
            type="date"
            value=${checkinDate}
            min=${minCheckout}
            max=${maxCheckout}
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date"
            type="date"
            value=${checkoutDate}
            min=${checkinDate}
            max=${maxCheckout}
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" autocomplete="off"/>
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  const searchForm = document.getElementById('searchForm')

  if(searchForm) {
    searchForm.onsubmit = (event: SubmitEvent): void => {
      event.preventDefault()

      const formData = new FormData(searchForm as HTMLFormElement)
      const formDataValue: SearchFormData = {}

      arrayNames.forEach(key => {
        formDataValue[key] = <keyType>formData.get(key)
      })

      if (!formDataValue.price || +formDataValue.price < 0) {
        return renderToast(
          {
            text: 'Поле цены не может быть пустым или меньше 0',
            type: 'success'
          },
          {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
        )
      }

      // @ts-ignore
      if (moment(formDataValue.checkin).isSameOrBefore(formDataValue.checkout)) search(formDataValue)
      else renderToast(
        {
          text: 'Дата выезда не может быть раньше даты заезда',
          type: 'success'
        },
        {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
      )
    }
  }


}
