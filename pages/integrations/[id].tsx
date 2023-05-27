import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Integration.module.css";
import { useRouter } from "next/router";
import { IntegrationData, getIntegration } from "../api/integrations/[id]";
import IntegrationForm from "../../components/integration-form";
import Image from "next/image";
import Link from "next/link";

type IntegrationPageProps =
    | {
          integration: IntegrationData;
          error: null;
      }
    | {
          integration: null;
          error: string;
      };

const IntegrationPage: NextPage<IntegrationPageProps> = ({
    integration,
    error,
}) => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <div className={styles.main}>
                <main className="container">
                    <p className={styles.description}>Loading...</p>
                </main>
            </div>
        );
    }

    if (error !== null) {
        return (
            <div className={styles.main}>
                <main className="container">
                    <p
                        className={`${styles.description} error-message`}
                        role="alert"
                    >
                        {error}
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.main}>
            <Head>
                <title>
                    {integration.name &&
                        `Blinq • Integrations • ${integration.name}`}
                </title>
                <meta name="description" content={integration?.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`container ${styles.container}`}>
                <div className={styles.integrationCard}>
                    <h1 className="my-0">Manage Integration</h1>
                    <div className="mt-2">
                        <Link href={`/`}>
                            <a className="link">Back</a>
                        </Link>
                    </div>

                    <div className="card mt-4">
                        <div className="card-header">
                            <div className="row flex-sm-nowrap justify-content-start">
                                <div className="col-auto flex-shrink-0">
                                    <div className={styles.logo}>
                                        <Image
                                            src={integration.logo}
                                            alt={`${integration.name} logo`}
                                            width={75}
                                            height={75}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-auto flex-shrink-1">
                                    <h4 className="my-0">{integration.name}</h4>
                                    <p className="my-0">
                                        {integration.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <IntegrationForm integration={integration} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<
    IntegrationPageProps
> = async (context) => {
    const { id } = context.query;
    try {
        if (typeof id !== "string") {
            throw new Error("Integration not found");
        }

        const integration = getIntegration(id);
        if (!integration) {
            throw new Error("Integration not found");
        } else {
            return { props: { integration, error: null } };
        }
    } catch (error: any) {
        return {
            props: {
                integration: null,
                error:
                    error.message ||
                    "Something went wrong! Please try again later.",
            },
        };
    }
};

export default IntegrationPage;
