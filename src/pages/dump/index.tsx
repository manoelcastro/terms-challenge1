import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

const Dump: NextPage = () => {
  const terms = [
    'arroz',
    'matrix',
    'tesoura',
    'manga',
    'pitomba',
    'maranhao',
    'hungria',
    'harry',
    'jumper',
    'paz',
    'aprovacao',
    'como',
    'dev',
  ];

  const router = useRouter();

  function gerarDump() {
    const mappedIsOk = terms.map(async term =>
      axios.get(`/api/terms?term=${term}`),
    );
    Promise.all(mappedIsOk)
      .then(() => {
        toast.success('Dump concluído! 🕵️‍♂️');
        router.push('/');
      })
      .catch(error => toast.error(error));
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    gerarDump();
  }
  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      Gerar Dump
    </button>
  );
};

export default Dump;
