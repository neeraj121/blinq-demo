import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Integration } from "../database";
import { useState, useEffect } from "react";
import IntegrationCard from "../components/integration-card";

const Home: NextPage = () => {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIntegrations = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/integrations");
                const data = await response.json();
                setIntegrations(data);
            } catch (error: any) {
                setError(
                    error.message ||
                        "Something went wrong! Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchIntegrations();
    }, []);

    return (
        <div className={styles.main}>
            <Head>
                <title>Blinq • Integrations</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container">
                <h1 className="text-center">Blinq</h1>
                <p className="text-center mt-3 mb-5">
                    Manage your integrations here
                </p>
                {isLoading ? (
                    <p className="text-center my-3">Loading...</p>
                ) : error ? (
                    <p className="text-center my-3 error-message" role="alert">
                        {error}
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {integrations.map((integration) => (
                            <IntegrationCard
                                key={integration.id}
                                integration={integration}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
