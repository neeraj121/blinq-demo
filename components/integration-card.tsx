import React from "react";
import styles from "../styles/IntegrationCard.module.css";
import Image from "next/image";
import { Integration } from "../database";
import Link from "next/link";

interface IntegrationCardProps {
    integration: Integration;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
    const { name, id, description, logo } = integration;
    return (
        <div className="card">
            <div className="card-body d-flex flex-column align-items-center justify-content-between">
                <div className={`text-center mx-auto mb-4 ${styles.cardTop}`}>
                    <Image
                        className={styles.logo}
                        src={logo}
                        alt={`${name} logo`}
                        width={90}
                        height={90}
                    />
                    <h4>{name}</h4>
                    <p className="mt-3">{description}</p>
                </div>

                <Link href={`/integrations/${id}`}>
                    <a className="btn">Configure</a>
                </Link>
            </div>
        </div>
    );
};

export default IntegrationCard;
