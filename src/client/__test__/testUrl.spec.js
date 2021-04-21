// TODO: import the url check function

import { isValidURL } from '../src/client/js/checkURL'
import 'babel-polyfill'

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(isValidURL).toBeDefined()
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        expect(isValidURL('asaddasf')).toBeFalsy()
    })

    test('Testing the checkUrl function return true for valid url', () => {
        // TODO: write your logic here
        expect(isValidURL('https://jamesclear.com/five-step-creative-process')).toBeTruth()
    })
})
