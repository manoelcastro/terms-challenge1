import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FcPlus, FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import InputBox from '../../Components/InputBox';
import MainResult from '../../Components/MainResult';
import RelatedResults from '../../Components/RelatedResults';
import PrismaConnection from '../../config/connecction';
import styles from './styles.module.scss';

type Related = {
  id: string;
  title: string;
  description: string;
};

type TermsPageProps = {
  termExists:
    | {
        title: string;
        description: string;
        image?: string;
        url: string;
        relateds: Related[];
      }
    | boolean;
};

const Terms: NextPage<TermsPageProps> = ({ termExists }: TermsPageProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [saveValue, setSaveValue] = useState('');
  const [save, setSave] = useState('');
  const router = useRouter();
  const iconSearch = () => <FcSearch />;
  const iconSave = () => <FcPlus />;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (save === '') {
      return null;
    }
    try {
      const main = async () => {
        const response = await axios.get(`/api/terms?term=${save}`);

        if (response.data.message === 'exist') {
          toast.error(
            'Esse termo já existe em nosso banco de dados, tente fazer uma busca por ele! 🔎',
          );
          return;
        }
        if (response.data.message === 'notFound') {
          toast.error('Esse termo não existe na Wikipédia 😩');
          return;
        }
        toast.success('Termo adicionado com sucesso');
      };
      main();
    } catch (e) {
      toast.error(e.message);
    }
  }, [save]);

  const handleSharedTermSubimit = () => {
    if (searchValue === '') {
      toast.warning('Tente pesquisar por um termo!');
      return;
    }
    const search = searchValue.toLowerCase().replace(' ', '&');

    router.push(`/term/${search}`);
  };

  const handleSaveTermSubmit = async () => {
    const saved = saveValue.toLowerCase().replace(' ', '&');
    setSave(saved);
  };

  if (!termExists) {
    toast.error('Opa, não temos esse termo em nosso banco de dados!', {
      toastId: new Date().toString(),
    });
    router.push('/');
  }

  return (
    <main className={styles.contentContainer}>
      <section className={styles.termsInputsContainer}>
        <h1>
          Search&Save
          <br />
          your own <span className={styles.cyanSpan}>terms</span>
        </h1>
        <InputBox
          handleValue={setSaveValue}
          handleSubmit={handleSaveTermSubmit}
          value={saveValue}
          icon={iconSave}
          placeholder="Salvar Termo"
        />
        <InputBox
          handleValue={setSearchValue}
          value={searchValue}
          icon={iconSearch}
          placeholder="Pesquisar Termo"
          handleSubmit={handleSharedTermSubimit}
        />
      </section>
      {!termExists ? (
        <section className={styles.termsResultCotainer} />
      ) : (
        <section className={styles.termsResultCotainer}>
          <MainResult term={termExists} />
          <RelatedResults relateds={termExists.relateds} />
        </section>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const prisma = PrismaConnection.getConnection();

  const term = context.params.term as string;

  const termExists = await prisma.term.findFirst({
    where: { term },
    include: { relateds: true },
  });

  if (!termExists) {
    return { props: { termExists: false } };
  }

  return { props: { termExists } };
};

export default Terms;
