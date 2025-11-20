import { PencilIcon, TrashIcon } from 'lucide-react';
import '../styles/QualificationTable.css';
interface Qualification {
  degree: string;
  institution: string;
  year: string;
}
interface QualificationTableProps {
  qualifications: Qualification[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}
export function QualificationTable({
  qualifications,
  onEdit,
  onDelete
}: QualificationTableProps) {
  return <div className="qualification-table-wrapper">
      <table className="qualification-table">
        <thead>
          <tr>
            <th>Degree</th>
            <th>Institution</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {qualifications.map((qual, index) => <tr key={index}>
              <td>{qual.degree}</td>
              <td>{qual.institution}</td>
              <td>{qual.year}</td>
              <td>
                <div className="qualification-actions">
                  <button onClick={() => onEdit(index)} className="qualification-action-btn edit">
                    <PencilIcon className="qualification-action-icon" />
                  </button>
                  <button onClick={() => onDelete(index)} className="qualification-action-btn delete">
                    <TrashIcon className="qualification-action-icon" />
                  </button>
                </div>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}