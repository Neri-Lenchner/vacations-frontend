import {JSX} from 'react';
import './AdminPage.css';
import {followersService} from '../../services/followers-service';

function AdminPage(): JSX.Element {

    const handleDownloadFollowersList = async () => {
        try {
            const vacationData = await followersService.getVacationDestinationWithFollowerCount();
            await followersService.downloadFollowersMapCSV(vacationData);
        } catch (error) {
            alert("Failed to download vacation followers list");
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Followers Map CSV</h1>
            <button onClick={handleDownloadFollowersList}>
                Click To Download
            </button>
        </div>
    );
}

export default AdminPage;