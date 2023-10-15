

export default function Button(props: buttonProps) {

    return <button type={props.Type} className="btn btn--primary" onClick={props.onClick}>{ props.children}</button>
}

interface buttonProps {
    children: React.ReactNode;
    onClick?(): void;
    Type: "button" | "submit";
}

Button.defaultProps = {
    type: "button"
}