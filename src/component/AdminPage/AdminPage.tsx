 import {JSX, useState} from 'react';
import {followersService} from '../../services/followers-service';

function AdminPage(): JSX.Element {
    const [loading, setLoading] = useState(false);

    const handleDownloadFollowersList = async () => {
        try {
            setLoading(true);
            const followers = await followersService.getFollowersList();
            await followersService.downloadFollowersCSV(followers);
        } catch (error) {
            console.error("Failed to download followers list:", error);
            alert("Failed to download followers list");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
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