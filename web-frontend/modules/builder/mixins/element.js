import RuntimeFormulaContext from '@baserow/modules/core/runtimeFormulaContext'
import { resolveFormula } from '@baserow/modules/core/formula'
import {
  ClickEvent,
  SubmitEvent,
  AfterLoginEvent,
} from '@baserow/modules/builder/eventTypes'
import { resolveColor } from '@baserow/modules/core/utils/colors'
import { themeToColorVariables } from '@baserow/modules/builder/utils/theme'

export default {
  inject: ['workspace', 'builder', 'page', 'mode', 'applicationContext'],
  provide() {
    return {
      applicationContext: {
        ...this.applicationContext,
        element: this.element,
        ...this.applicationContextAdditions,
      },
    }
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
    applicationContextAdditions: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    workflowActionsInProgress() {
      const workflowActions = this.$store.getters[
        'workflowAction/getElementWorkflowActions'
      ](this.page, this.element.id)
      return workflowActions.some((workflowAction) =>
        this.$store.getters['workflowAction/getDispatching'](workflowAction)
      )
    },
    elementType() {
      return this.$registry.get('element', this.element.type)
    },
    isEditMode() {
      return this.mode === 'editing'
    },
    runtimeFormulaContext() {
      /**
       * This proxy allow the RuntimeFormulaContextClass to act like a regular object.
       */
      return new Proxy(
        new RuntimeFormulaContext(
          this.$registry.getAll('builderDataProvider'),
          this.applicationContext
        ),
        {
          get(target, prop) {
            return target.get(prop)
          },
        }
      )
    },
    formulaFunctions() {
      return {
        get: (name) => {
          return this.$registry.get('runtimeFormulaFunction', name)
        },
      }
    },
    colorVariables() {
      return themeToColorVariables(this.builder.theme)
    },
  },
  methods: {
    resolveFormula(formula, formulaContext = null) {
      try {
        return resolveFormula(
          formula,
          this.formulaFunctions,
          formulaContext || this.runtimeFormulaContext
        )
      } catch (e) {
        return ''
      }
    },
    async fireEvent(EventType) {
      if (this.mode !== 'editing') {
        if (this.workflowActionsInProgress) {
          return false
        }

        const workflowActions = this.$store.getters[
          'workflowAction/getElementWorkflowActions'
        ](this.page, this.element.id)

        try {
          await new EventType({
            i18n: this.$i18n,
            store: this.$store,
            registry: this.$registry,
          }).fire({
            workflowActions,
            resolveFormula: this.resolveFormula,
            applicationContext: this.applicationContext,
          })
        } catch (e) {
          let toastTitle = this.$i18n.t(
            'dispatchWorkflowActionError.defaultTitle'
          )
          let toastMessage = this.$i18n.t(
            'dispatchWorkflowActionError.defaultMessage'
          )
          if (e.error !== 'ERROR_WORKFLOW_ACTION_FORM_DATA_INVALID') {
            toastTitle = this.$i18n.t(
              'dispatchWorkflowActionError.formDataInvalidTitle'
            )
            toastMessage = this.$i18n.t(
              'dispatchWorkflowActionError.formDataInvalidMessage'
            )
          }
          return this.$store.dispatch('toast/error', {
            title: toastTitle,
            message: toastMessage,
          })
        }
      }
    },
    fireClickEvent() {
      return this.fireEvent(ClickEvent)
    },
    fireSubmitEvent() {
      this.fireEvent(SubmitEvent)
    },
    fireAfterLoginEvent() {
      this.fireEvent(AfterLoginEvent)
    },

    resolveColor,
  },
}
