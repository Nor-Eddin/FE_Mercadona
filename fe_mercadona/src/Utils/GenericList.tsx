/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";

export default function GenericList(props:genericListProps) {
    if (!props.list) {
        if (props.loadingUI) {
            return props.loadingUI;
        }
        return <>Loading......</>
    } else if (props.list.length === 0) {
        if (props.emptyListUI) {
            return props.emptyListUI
        }
        return <>Il n'y a aucun produit a afficher</>
    } else {
        return props.children;
    }

}

interface genericListProps {
    list:any;
    loadingUI?: ReactElement;
    emptyListUI?: ReactElement;
    children: ReactElement;
}