import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcPlus, FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import styles from '../../styles/home.module.scss';
import InputBox from '../Components/InputBox';

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [saveValue, setSaveValue] = useState('');

  const iconSearch = () => <FcSearch />;
  const iconSave = () => <FcPlus />;

  const router = useRouter();

  const handleSharedTermSubimit = () => {
    if (searchValue === '') {
      toast.warning('Tente pesquisar por um termo!');
      return;
    }
    const search = searchValue.toLowerCase().replace(' ', '&');

    router.push(`/term/${search}`);
  };

  const handleSaveTermSubmit = async () => {
    const save = saveValue.toLowerCase().replace(' ', '&');

    try {
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
    } catch (e) {
      toast.error(e.message);
    }
  };

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
          value={saveValue}
          icon={iconSave}
          placeholder="Gravar Termo"
          handleSubmit={handleSaveTermSubmit}
        />
        <InputBox
          handleValue={setSearchValue}
          value={searchValue}
          icon={iconSearch}
          placeholder="Pesquisar Termo"
          handleSubmit={handleSharedTermSubimit}
        />
      </section>
    </main>
  );
};

export default Home;
