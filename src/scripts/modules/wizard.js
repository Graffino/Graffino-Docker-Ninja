import Component from '../utils/component'
import { stateClass, choicesOptions, validateOptions } from '../utils/globals'
import Pristine from 'pristinejs'
import Choices from 'choices.js'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'
// import axios from 'axios'

export default class Wizard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props
    }
  }

  init () {
    const $formElement = this.state.element

    this.setState({
      steps: $formElement.querySelectorAll('[data-step]'),
      country: null,
      service: null,
      children: null,
      year: null,
      months: null,
      salary: null,
      step1: {
        element: null,
        copy: null,
        options: null
      },
      step2: {
        element: null,
        copy: null,
        options: null
      },
      step3: {
        element: null,
        copy: null,
        options: null,
        range: null,
        display: null
      },
      finalStep: {
        element: null
      },
      calculatorParams: []
    })

    this.state.steps[0].classList.remove(stateClass.hidden)

    const $countrySelector = document.querySelectorAll(
      'input[type=radio][name=country]'
    )

    const $serviceSelector = document.querySelectorAll(
      'input[type=radio][name=service]'
    )

    Array.from($countrySelector).forEach((selector) => {
      selector.addEventListener('change', () => {
        this.state.country = selector.value
        this.advanceStep(1)
      })
    })

    Array.from($serviceSelector).forEach((selector) => {
      selector.addEventListener('change', () => {
        this.state.service = selector.value
        this.advanceStep(2)
        this.handleNextSteps()
      })
    })

    Array.from(this.state.element.querySelectorAll('.js-next-button')).forEach(
      (button) => {
        button.addEventListener('click', () => {
          if (button.dataset.calculate !== undefined) {
            this.state.calculatorParams.push(
              this.state.country,
              this.state.service,
              this.state.months ? parseInt(this.state.children, 10) : null,
              this.state.year,
              this.state.months ? parseInt(this.state.months, 10) : null,
              this.state.salary ? parseInt(this.state.salary, 10) : null
            )
            this.sendRequest(this.state.calculatorParams)
          }
          this.validateStep(button.dataset.currentStep, button.dataset.nextStep)
        })
      }
    )

    this.state.element
      .querySelector('.js-wizard-reset')
      .addEventListener('click', () => {
        // TODO: Rethink reset logic
        Array.from(this.state.steps).forEach((step) => {
          step.classList.add(stateClass.hidden)
        })

        this.state.steps[0].classList.remove(stateClass.hidden)
      })
  }

  setCurrent (stepIndex) {
    Array.from(this.state.steps).forEach((step) => {
      step.classList.remove(stateClass.current)
    })

    this.state.steps[stepIndex].classList.remove(stateClass.hidden)
    this.state.steps[stepIndex].classList.add(stateClass.current)
  }

  advanceStep (stepIndex) {
    const previousStepIndex = stepIndex - 1
    this.animateStep(
      previousStepIndex,
      'fadeOut',
      this.hideStep(previousStepIndex)
    )
    this.animateStep(stepIndex, 'fadeIn', this.setCurrent(stepIndex))
  }

  animateStep (stepIndex, animationName, callback) {
    const step = this.state.steps[stepIndex]
    step.classList.add(stateClass.animated, animationName)

    const handleAnimationEnd = () => {
      step.classList.remove(stateClass.animated, animationName)
      step.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    step.addEventListener('animationend', handleAnimationEnd)
  }

  hideStep (stepIndex) {
    this.state.steps[stepIndex].classList.add(stateClass.hidden)
  }

  validateStep (stepIndex, nextStepIndex) {
    const $step = this.state.element.querySelector(`[data-step="${stepIndex}"]`)
    const button = $step.querySelector('.js-next-button')
    const pristine = new Pristine($step, validateOptions, true)
    const valid = pristine.validate()

    if (valid) {
      $step.classList.add('is-valid')
      this.hideStep(stepIndex)
      this.advanceStep(nextStepIndex)
    } else {
      button.classList.add('animation-shake')
      button.addEventListener('animationend', (e) => {
        e.preventDefault()
        button.classList.remove('animation-shake')
      })
    }
  }

  sendRequest (params) {
    const filtered = params.filter((param) => {
      return param != null
    })

    const string = filtered.join('_')

    console.log(string)

    // TODO: Implement AJAX call when API is ready
    // const AJAX_URL = process.env.API_URL
    // axios
    //   .post(AJAX_URL, new FormData(form))
    //   .then((response) =>
    //     this.responseCallback({
    //       type: response.data.result,
    //       msg: response.data.msg
    //     })
    //   )
    //   .catch((error) =>
    //     this.responseCallback({
    //       type: 'error',
    //       msg: error
    //     })
    //   )
  }

  handleNextSteps () {
    if (this.state.service === 'impozit') {
      this.state.step1.element = this.state.element.querySelector(
        '[data-step-number="1"]'
      )
      this.state.step1.copy = 'Selectati mai jos anul in care ati lucrat'
      this.state.step1.options = ['2016', '2017', '2018', '2019', '2020']

      this.state.step1.element.querySelector(
        '.js-step-text'
      ).innerText = this.state.step1.copy
      const step1Select = new Choices(
        this.state.step1.element.querySelector('.js-step-select'),
        choicesOptions
      )
      step1Select.setValue(this.state.step1.options)

      this.state.year = step1Select.getValue(true)

      step1Select.passedElement.element.addEventListener('choice', (event) => {
        this.state.year = event.detail.choice.value
      })

      this.state.step2.element = this.state.element.querySelector(
        '[data-step-number="2"]'
      )
      this.state.step2.copy =
        'Selectati mai jos totalul lunilor lucrate din 2017 pana in prezent'
      this.state.step2.options = [
        '1 luna lucrata',
        '2 luni lucrate',
        '3 luni lucrate',
        '4 luni lucrate',
        '5 luni lucrate',
        '6 luni lucrate',
        '7 luni lucrate',
        '8 luni lucrate',
        '9 luni lucrate',
        '10 luni lucrate',
        '11 luni lucrate',
        '12 luni lucrate'
      ]

      this.state.step2.element.querySelector(
        '.js-step-text'
      ).innerText = this.state.step2.copy
      const step2Select = new Choices(
        this.state.step2.element.querySelector('.js-step-select'),
        choicesOptions
      )

      step2Select.setValue(this.state.step2.options)

      this.state.months = step2Select.getValue(true)

      step2Select.passedElement.element.addEventListener('choice', (event) => {
        this.state.months = event.detail.choice.value
      })

      this.state.step3.element = this.state.element.querySelector(
        '[data-step-number="3"]'
      )
      this.state.step3.copy = 'Selectati mai jos salariul net/luna lucrata'
      this.state.step3.options = null

      this.state.step3.element.querySelector(
        '.js-next-button'
      ).dataset.calculate = true

      this.state.step3.element.querySelector(
        '.js-step-text'
      ).innerText = this.state.step3.copy

      this.state.step3.element
        .querySelector('.js-step-select')
        .classList.add('h-visually-hidden')

      this.state.step3.element.querySelector('.js-step-select').required = false

      this.state.step3.range = this.state.step3.element.querySelector(
        '.js-step-range'
      )

      noUiSlider.create(this.state.step3.range, {
        start: 1500,
        connect: 'lower',
        range: {
          min: [0],
          max: [2000]
        }
      })

      this.state.step3.display = this.state.step3.element.querySelector(
        '.js-step-range-display'
      )

      const rangeSliderInstance = this.state.step3.range.noUiSlider

      const currencySuffix = wNumb({
        suffix: '€'
      })

      this.state.salary = rangeSliderInstance.get()

      rangeSliderInstance.on('update', (values, handle) => {
        const value = values[handle]

        this.state.step3.display.value = currencySuffix.to(parseInt(value, 10))
        this.state.salary = value
      })

      this.state.step3.display.addEventListener('change', function () {
        const value = currencySuffix.from(this.value)
        rangeSliderInstance.set(value)
      })

      this.state.finalStep.element = this.state.element.querySelector(
        '[data-final-step]'
      )
      this.state.finalStep.copy = `Pentru cele ${this.state.months} luni lucrate in ${this.state.year}, puteti recupera suma de:`
      this.state.finalStep.element.querySelector(
        '.js-step-text'
      ).innerText = this.state.finalStep.copy
    } else if (this.state.service === 'alocatie') {
      switch (this.state.country) {
      case 'germany': {
        this.state.step1.element = this.state.element.querySelector(
          '[data-step-number="1"]'
        )
        this.state.step1.copy =
            'Selectati mai jos totalul lunilor lucrate in ultemele 6 luni'
        this.state.step1.options = [
          '1 luna lucrata',
          '2 luni lucrate',
          '3 luni lucrate',
          '4 luni lucrate',
          '5 luni lucrate',
          '6 luni lucrate'
        ]

        this.state.step1.element.querySelector(
          '.js-step-text'
        ).innerText = this.state.step1.copy
        const step1Select = new Choices(
          this.state.step1.element.querySelector('.js-step-select'),
          choicesOptions
        )
        step1Select.setValue(this.state.step1.options)

        this.state.months = step1Select.getValue(true)

        step1Select.passedElement.element.addEventListener(
          'choice',
          (event) => {
            this.state.months = event.detail.choice.value
          }
        )

        this.state.step2.element = this.state.element.querySelector(
          '[data-step-number="2"]'
        )
        this.state.step2.copy = 'Selectati mai jos numarul de copii'
        this.state.step2.options = [
          '1 copil',
          '2 copii',
          '3 copii',
          '4 copii',
          '5 copii',
          '6 copii',
          '7 copii',
          '8 copii',
          '9 copii',
          '10 copii'
        ]

        this.state.step2.element.querySelector(
          '.js-step-text'
        ).innerText = this.state.step2.copy
        const step2Select = new Choices(
          this.state.step2.element.querySelector('.js-step-select'),
          choicesOptions
        )
        step2Select.setValue(this.state.step2.options)

        this.state.children = step2Select.getValue(true)

        step2Select.passedElement.element.addEventListener(
          'choice',
          (event) => {
            this.state.children = event.detail.choice.value
          }
        )

        this.state.step2.element.querySelector(
          '.js-next-button'
        ).dataset.nextStep = '5'
        this.state.step2.element.querySelector('.js-next-button').innerText =
            'Calculeaza'
        this.state.step2.element.querySelector(
          '.js-next-button'
        ).dataset.calculate = true

        this.state.finalStep.element = this.state.element.querySelector(
          '[data-final-step]'
        )
        this.state.finalStep.copy = `Pentru cele ${this.state.months} luni lucrate in ${this.state.year}, puteti recupera suma de:`
        this.state.finalStep.element.querySelector(
          '.js-step-text'
        ).innerText = this.state.finalStep.copy

        break
      }

      case 'austria': {
        this.state.step1.element = this.state.element.querySelector(
          '[data-step-number="1"]'
        )
        this.state.step1.copy = `Selectati mai jos totalul lunilor lucrate din ${this.state.year} pana in prezent`
        this.state.step1.options = [
          '6 luna lucrata',
          '12 luni lucrate',
          '24 luni lucrate',
          '36 luni lucrate',
          '48 luni lucrate',
          '60 luni lucrate'
        ]

        this.state.step1.element.querySelector(
          '.js-step-text'
        ).innerText = this.state.step1.copy
        const step1Select = new Choices(
          this.state.step1.element.querySelector('.js-step-select'),
          choicesOptions
        )
        step1Select.setValue(this.state.step1.options)

        this.state.months = step1Select.getValue(true)

        step1Select.passedElement.element.addEventListener(
          'choice',
          (event) => {
            this.state.months = event.detail.choice.value
          }
        )

        this.state.step2.element = this.state.element.querySelector(
          '[data-step-number="2"]'
        )
        this.state.step2.copy = 'Selectati mai jos numarul de copii'
        this.state.step2.options = [
          '1 copil',
          '2 copii',
          '3 copii',
          '4 copii'
        ]

        this.state.step2.element.querySelector(
          '.js-step-text'
        ).innerText = this.state.step2.copy
        const step2Select = new Choices(
          this.state.step2.element.querySelector('.js-step-select'),
          choicesOptions
        )
        step2Select.setValue(this.state.step2.options)

        this.state.children = step2Select.getValue(true)

        step2Select.passedElement.element.addEventListener(
          'choice',
          (event) => {
            this.state.children = event.detail.choice.value
          }
        )

        this.state.step2.element.querySelector(
          '.js-next-button'
        ).dataset.nextStep = '5'
        this.state.step2.element.querySelector('.js-next-button').innerText =
            'Calculeaza'
        this.state.step2.element.querySelector(
          '.js-next-button'
        ).dataset.calculate = true

        this.state.finalStep.element = this.state.element.querySelector(
          '[data-final-step]'
        )
        this.state.finalStep.copy = `Pentru cele ${this.state.months} luni lucrate in ${this.state.year}, puteti recupera suma de:`
        this.state.finalStep.element.querySelector(
          '.js-step-text'
        ).innerText = this.state.finalStep.copy

        break
      }

      default:
        break
      }
    }
  }
}
