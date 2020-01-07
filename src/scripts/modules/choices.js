import Component from '../utils/component'
import Choices from 'choices.js'
import { isTrue } from '../utils/helpers'

const title = {
  law: [
    { value: '', label: 'Choose Title', disabled: true, selected: true, placeholder: true },
    { value: 'chief_of_police', label: 'Chief Of Police' },
    { value: 'police_commissioner', label: 'Police Commissioner' },
    { value: 'superintendent', label: 'Superintendent' },
    { value: 'sheriff', label: 'Sheriff' },
    { value: 'assistant_chief_of_police', label: 'Assitant Chief Of Police' },
    { value: 'assistant_commissioner', label: 'Assitant Commissioner' },
    { value: 'assistant_superintendent', label: 'Assitant Superintendent' },
    { value: 'deputy_chief_of_police', label: 'Deputy Chief Of Police' },
    { value: 'deputy_commissioner', label: 'Deputy Commissioner' },
    { value: 'deputy_superintendent', label: 'Deputy Superintendent' },
    { value: 'undersheriff', label: 'Undersheriff' },
    { value: 'inspector_commander', label: 'Inspector Commander' },
    { value: 'colonel', label: 'Colonel' },
    { value: 'major', label: 'Major' },
    { value: 'captain', label: 'Captain' },
    { value: 'lieutenant', label: 'Lieutenant' },
    { value: 'sergeant', label: 'Sergeant' },
    { value: 'detective', label: 'Detective' },
    { value: 'inspector', label: 'Inspector' },
    { value: 'investigator', label: 'Investigator' },
    { value: 'officer', label: 'Officer' },
    { value: 'deputy', label: 'Deputy' },
    { value: 'trooper', label: 'Trooper' },
    { value: 'corporal', label: 'Corporal' },
    { value: 'special_agent', label: 'Special Agent' },
    { value: 'group_supervisor', label: 'Group Supervisor' },
    { value: 'resident_agent_in_charge', label: 'Resident Agent In Charge' },
    { value: 'assistant_special_agent_in_charge', label: 'Assistant Special Agent In Charge' },
    { value: 'special_agent_in_charge', label: 'Special Agent In Charge' },
    { value: 'deputy_assistant_director', label: 'Deputy Assistant Director' },
    { value: 'assistant_director', label: 'Assistant Director' },
    { value: 'executive_assistant_director', label: 'Executive Assistant Director' },
    { value: 'deputy_director', label: 'Deputy Director' },
    { value: 'director', label: 'Director' },
    { value: 'other', label: 'Other' }
  ],

  foundation: [
    { value: '', label: 'Choose Title', disabled: true, selected: true, placeholder: true },
    { value: 'executive_director', label: 'Executive Director' },
    { value: 'executive_advisor', label: 'Executive Advisor' },
    { value: 'director', label: 'Director' },
    { value: 'president', label: 'President' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'advisor', label: 'Advisor' },
    { value: 'operations', label: 'Operations' },
    { value: 'other', label: 'Other' }
  ]
}

export default class Module extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
  }

  init () {
    this.state.element.choicesHandler = this

    const options = {
      searchEnabled: false,
      itemSelectText: ''
    }

    const choices = new Choices(this.state.element, options)

    if (this.state.element.dataset.initialValue) {
      choices.setChoiceByValue(this.state.element.dataset.initialValue)
    }

    if (this.state.element.dataset.toggler) {
      const toggler = this.state.element.dataset.toggler
      const fields = document.querySelector(`[data-toggled-by*=${toggler}]`)

      fields.classList.add('h-visually-hidden')

      const value = choices.getValue(true)

      this.toggleFieldHandler(toggler, value)

      choices.passedElement.element.addEventListener('choice', choice => {
        const value = choice.detail.choice.value
        const toggler = choice.srcElement.dataset.toggler

        this.toggleFieldHandler(toggler, value)
      })
    }

    this.setState({ choices })

    $(choices.passedElement.element)
      .closest('.choices')
      .on('blur', function () {
        window.pristine.validate($(this).find('select'))
      })

    choices.passedElement.element.addEventListener('choice', choice => {
      setTimeout(() => {
        window.pristine.validate(choice.srcElement)
      }, 0)
    })

    if (this.state.element.dataset.changes) {
      setTimeout(() => {
        if (this.state.element.value.length > 0) {
          const value = $(this.state.element).find('option').filter(':selected').val()
          const changeable = this.state.element.dataset.changes

          const changedField = document.querySelector(`[data-changeable="${changeable}"]`)

          changedField.choicesHandler.state.choices.clearStore().setChoices(title[value], 'value', 'label', false)
          if ($(changedField).data('default-choice')) {
            changedField.choicesHandler.state.choices.setChoiceByValue($(changedField).data('default-choice'))
          }
        }
      }, 0)

      choices.passedElement.element.addEventListener('choice', choice => {
        const value = choice.detail.choice.value
        const changeable = choice.srcElement.dataset.changes

        const changedField = document.querySelector(`[data-changeable="${changeable}"]`)

        changedField.choicesHandler.state.choices
          .clearStore()
          .setChoices(title[value], 'value', 'label', false)

        window.pristine.validate(changedField)
      })
    }
  }

  toggleFieldHandler (toggler, value) {
    const toggledSection = document.querySelector(`[data-toggled-by="${toggler}-${value}"]`)

    if (toggledSection) {
      if (!isTrue(toggledSection.dataset.toggled)) {
        toggledSection.classList.remove('h-visually-hidden')
        toggledSection.dataset.toggled = 'true'
      } else if (isTrue(toggledSection.dataset.toggled)) {
        toggledSection.classList.add('h-visually-hidden')
        toggledSection.dataset.toggled = 'false'
      }
    } else {
      const fields = document.querySelector(`[data-toggled-by*=${toggler}]`)
      fields.classList.add('h-visually-hidden')
      fields.dataset.toggled = 'false'
    }
  }
}
