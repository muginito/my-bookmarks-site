export default function InputBar({ id, type, placeholder, onChange, value }) {
    return (
        <input className="bar" id={id} type={type} placeholder={placeholder} onChange={onChange} value={value} />
    )
}
// O "onChange" é um alarme, pra toda vez que algúem digitar uma letra e joga isso pra função do "pai"
