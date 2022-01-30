import { createContext } from 'react'

//ICONS
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as CgIcons from 'react-icons/cg'
import * as RiIcons from 'react-icons/ri'
import * as FiIcons from 'react-icons/fi'

export const Contexts = {
  Admin: {
    leftNavData: [
      {
        title: 'Registros',
        path: 'Admin/registros',
        icon: <AiIcons.AiOutlineSearch />,
        cName: 'nav-left-text',
      },
    ],
  },
}

export const RoleContexts = createContext(Contexts)
