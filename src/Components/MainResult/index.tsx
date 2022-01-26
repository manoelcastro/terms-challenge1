import { NextPage } from 'next';
import Image from 'next/image';
import styles from './styles.module.scss';

type TermArguments = {
  title: string;
  description: string;
  image?: string;
  url: string;
};

type MainResultProps = {
  term: TermArguments;
};

const MainResult: NextPage<MainResultProps> = ({ term }) => {
  const { title, description, image, url } = term;

  return (
    <div className={styles.mainResult}>
      <div className={styles.dataContainer}>
        <h2>Resposta da Pesquisa</h2>
        <p>
          <strong>Title</strong> {title}
        </p>
        <p>
          <strong>Description</strong> {description}
        </p>
        <p>
          <strong>URL </strong>
          <a href={url}>{url}</a>
        </p>
      </div>
      <figure className={styles.imageContainer}>
        {image ? (
          <Image src={image} layout="fill" alt={title} />
        ) : (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png"
            layout="fill"
            alt={title}
          />
        )}
      </figure>
    </div>
  );
};

export default MainResult;
