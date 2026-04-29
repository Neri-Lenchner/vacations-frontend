import {JSX} from 'react';
import './AdminPage.css';
import {followersService} from '../../services/followers-service';

function AdminPage(): JSX.Element {

    const handleDownloadFollowersList = async () => {
        try {
            const vacationData = await followersService.getVacationDestinationWithFollowerCount();
            await followersService.downloadVacationDestinationCSV(vacationData);
        } catch (error) {
            alert("Failed to download vacation followers list");
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Download Followers Map CSV</h1>
            <button onClick={handleDownloadFollowersList}>
                Download Followers List (CSV)
            </button>
        </div>
    );
}

export default AdminPage;