import {renderBlock} from './lib.js'

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


  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
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
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
