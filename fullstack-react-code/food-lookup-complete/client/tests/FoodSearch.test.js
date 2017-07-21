// We populate this file in the chapter "Unit Testing"
/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme'
import React from 'react'
import FoodSearch from '../src/FoodSearch'
import Client from '../src/Client'

jest.mock('../src/Client')

describe('FoodSearch', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <FoodSearch />
    )
  })

  afterEach(() => {
    Client.search.mockClear()
  })

  it('should not display the remove icon', () => {
    expect(
      wrapper.find('.remove.icon').length
    ).toBe(0)
  })

  it('should display zero rows', () => {
    expect(
      wrapper.find('tbody tr').length
    ).toBe(0)
  })

  describe('user populates search field', () => {
    const value = 'brocc'

    beforeEach(() => {
      const input = wrapper.find(`input`).first()
      input.simulate('change', {
        target: {
          value
        }
      })
    })

    it('should update the state property `searchValue`', () => {
      expect(
        wrapper.state().searchValue
      ).toEqual(value)
    })

    it('should display the remove icon', () => {
      expect(
        wrapper.find('.remove.icon').length
      ).toBe(1)
    })

    it('should call `Client.search()` with `value`', () => {
      const invocationArgs = Client.search.mock.calls[0]
      expect(
        invocationArgs[0]
      ).toEqual(value)
    })

    describe('and API returns results', () => {
      beforeEach(() => {

      })
      // ... specs

      describe('then user clicks food item', () => {
        beforeEach(() => {
          // ... simulate user clicking food item
        })

        // ... specs
      })

      describe('then user types more', () => {
        beforeEach(() => {
          // ... simulate user typing "x"
        })

        describe('and API returns no results', () => {
          beforeEach(() => {
            // ... simulate API returning no results
          })

          // ... specs
        })
      })
    })
  })
})
