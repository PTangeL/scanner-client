import React from 'react'
import { shallow } from 'enzyme'
import { ListItem } from 'material-ui/List'

import composeNavDrawer, { NavDrawer } from './NavDrawer'

describe('<NavDrawer />', () => {
  const createDefaultProps = () => ({
    history: { push: jest.fn() },
    toggleNav: jest.fn(),
    styles: {},
    logout: jest.fn(),
    open: false
  })

  it('should navigate to a given page by clicking on a ListItem', () => {
    const props = createDefaultProps()
    const wrapper = shallow(<NavDrawer {...props} />)
    wrapper.find(ListItem).first().simulate('click')

    expect(props.history.push).toBeCalledWith('/academy/trainings')
  })

  it('should close the user session when clicking on the close session ListItem', () => {
    const props = createDefaultProps()
    const wrapper = shallow(<NavDrawer {...props} />)
    wrapper.find(ListItem).last().simulate('click')

    expect(props.logout).toBeCalled()
  })
})
