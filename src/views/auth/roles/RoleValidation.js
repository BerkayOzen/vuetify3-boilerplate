import {validationMixin} from 'vuelidate';
import {maxLength, minLength, required, requiredIf, requiredUnless} from 'vuelidate/lib/validators';
import RegexHelper from "../../../../utils/RegexHelper";

export default {
    mixins: [validationMixin],
    validations: {
        item: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(200),
                nameWithoutSpacial: async function (value) {
                    return !value || RegexHelper.descriptionTablesRegex.test(value);
                }
            },
            description: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(200),
                nameWithoutSpacial: async function (value) {
                    return !value || RegexHelper.descriptionTablesRegex.test(value);
                }
            },
        },
    },
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.item.name.$dirty) return errors;
            !this.$v.item.name.required && errors.push(this.$tc('validation.required', 'Ad'));
            !this.$v.item.name.minLength && errors.push(this.$tc('validation.minLength', 'Ad', 3));
            !this.$v.item.name.maxLength && errors.push(this.$tc('validation.maxLength', 'Ad', 200));
            !this.$v.item.name.nameWithoutSpacial && errors.push(this.$tc('validation.withoutSpacialAlternate'));
            return errors;
        },
        descriptionErrors() {
            const errors = [];
            if (!this.$v.item.description.$dirty) return errors;
            !this.$v.item.description.required && errors.push(this.$tc('validation.required', 'Açıklama'));
            !this.$v.item.description.minLength && errors.push(this.$tc('validation.minLength', 'Açıklama', 3));
            !this.$v.item.description.maxLength && errors.push(this.$tc('validation.maxLength', 'Açıklama', 200));
            !this.$v.item.description.nameWithoutSpacial && errors.push(this.$tc('validation.withoutSpacialAlternate'));
            return errors;
        },
    },
}
