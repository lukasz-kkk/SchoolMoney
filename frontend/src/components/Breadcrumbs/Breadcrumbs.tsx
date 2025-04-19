import styles from "./Breadcrumbs.module.scss";
import { Link } from "react-router-dom";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav className={styles.container}>
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isLastItem = index === items.length - 1;

                    return (
                        <li key={index} className={styles.item}>
                            {item.href && !isLastItem ? (
                                <Link to={item.href} className={styles.link}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={styles.current} aria-current={isLastItem ? "page" : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
