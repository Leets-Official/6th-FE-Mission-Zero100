export default function Checkbox({ id, defaultChecked = false, ...props }) {
    return <input id={id} type="checkbox" defaultChecked={defaultChecked} {...props} />;
}
