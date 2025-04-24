interface Props {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChangePage }: Props) {
  return (
    <nav>
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link text-dark"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Предыдущая
          </button>
        </li>

        <li className="page-item">
          <span className="page-link text-dark">
            {currentPage} / {totalPages}
          </span>
        </li>

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link text-dark"
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Следующая
          </button>
        </li>
      </ul>
    </nav>
  );
}
