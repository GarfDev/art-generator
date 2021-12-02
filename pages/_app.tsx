import { GlobalStyle } from '../core/theme/global'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle />
      <Component {...pageProps} />
    </DndProvider>
  )
}

export default MyApp
