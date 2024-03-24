import css from './ErrorMessage.module.css'

const ErrorMessage = ({ children }) => {
  return (
    <div className={css.error}>{children}</div>
  )
}

export default ErrorMessage