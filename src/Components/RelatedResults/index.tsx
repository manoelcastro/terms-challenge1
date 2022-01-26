import { NextPage } from 'next';
import styles from './styles.module.scss';

type RelatedProps = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  relateds: RelatedProps[];
};

const RelatedResults: NextPage<Props> = ({ relateds }) => {
  return (
    <div className={styles.relatedResults}>
      <h2>Related Results</h2>
      <ul>
        {relateds.map(relatedTerm => (
          <li key={relatedTerm.id}>
            <p>
              <strong>Title </strong>
              {relatedTerm.title}
            </p>
            <p>
              <strong>Description </strong> {relatedTerm.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedResults;
