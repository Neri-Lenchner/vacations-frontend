import {JSX, useState} from 'react';
import './AdminPage.css';
import {followersService} from '../../services/followers-service';

function AdminPage(): JSX.Element {
    const [loading, setLoading] = useState(false);

    const handleDownloadFollowersList = async () => {
        try {
            setLoading(true);
            const vacationData = await followersService.getVacationDestinationWithFollowerCount();
            await followersService.downloadVacationDestinationCSV(vacationData);
        } catch (error) {
            console.error("Failed to download vacation followers list:", error);
            alert("Failed to download vacation followers list");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Download Followers Map CSV</h1>
            <button
                onClick={handleDownloadFollowersList}
                disabled={loading}
            >
                {loading ? 'Downloading...' : 'Download Followers List (CSV)'}
            </button>
        </div>
    );
}

export default AdminPage;