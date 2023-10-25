import * as Yup from 'yup';
export default function configureValidations() {
    Yup.addMethod(Yup.string, 'FirstLetterUpperCase', function () {
        return this.test('first-letter-uppercase', 'La premiere lettre doit etres une majuscules', function (value) {
            if (value && value.length > 0) {
                const firstLetter = value.substring(0, 1);
                return firstLetter === firstLetter.toLocaleUpperCase();
            }
            return true;
        })
    })
}