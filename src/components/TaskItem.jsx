import Checkbox from './Checkbox';
import Button from './Button';

export default function TaskItem({ id, label, defaultChecked }) {
    return (
        <li style={{ display: 'grid', gap: 8 }}>
            { /*체크박스*/}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Checkbox id={id} defaultChecked={defaultChecked} />
                <label htmlFor={id}>{label}</label>
            </div>

            {/*편집, 삭제*/}
            <div style={{ display: 'flex', gap: 8, paddingLeft: 24 }}>
                <Button>{`Edit ${label}`}</Button>
                <Button>{`Delete ${label}`}</Button>
            </div>
        </li>
    );
}
