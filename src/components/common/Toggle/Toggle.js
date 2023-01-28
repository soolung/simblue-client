import './Toggle.scss';

export default function Toggle({ containerClassName, label, className, onClick, value, name, id, readOnly = false }) {
  return (
    <>
      <label className='toggle'
             onClick={onClick}
      >
        <input
          type="hidden"
          value={value}
          name={name}
          id={id}
          readOnly={readOnly}
        />
        <div className={`toggle-container ${value ? '' : 'disabled'} ${containerClassName}`}>
          <div className={`toggle-circle ${className}`}/>
        </div>
        <span>{label}</span>
      </label>
    </>
  )
}
