import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { LSTodoRepository } from './Todos/Infrastructure/LSTodoRepository.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App todoRepository={new LSTodoRepository()} />
)