import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="nav-bar">
      <div className="container">
        <div className="nav-content">
          <div className="mobile-menu-button">
            <Disclosure.Button className="mobile-button">
              <Bars3Icon aria-hidden="true" className="menu-icon" />
              <XMarkIcon aria-hidden="true" className="close-icon" />
            </Disclosure.Button>
          </div>
          <div className="brand-navigation">
            <img alt="Your Company" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" className="brand-logo" />
            <div className="menu-links">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} aria-current={item.current ? 'page' : undefined} className={classNames(item.current ? 'current-page' : '', 'nav-link')}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="user-profile">
            <button type="button" className="notifications-button">
              <BellIcon aria-hidden="true" className="bell-icon" />
            </button>
            <Menu as="div" className="profile-menu">
              <div>
                <Menu.Button className="profile-button">
                  <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="profile-avatar" />
                </Menu.Button>
              </div>
              <Menu.Items className="profile-dropdown">
                <Menu.Item><a href="#" className="dropdown-item">Your Profile</a></Menu.Item>
                <Menu.Item><a href="#" className="dropdown-item">Settings</a></Menu.Item>
                <Menu.Item><a href="#" className="dropdown-item">Sign out</a></Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="mobile-menu">
        <div className="mobile-menu-content">
          {navigation.map((item) => (
            <Disclosure.Button key={item.name} as="a" href={item.href} aria-current={item.current ? 'page' : undefined} className="mobile-link">
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  )
}
