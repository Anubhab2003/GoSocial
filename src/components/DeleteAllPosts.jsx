import React, { useState } from 'react';
import appwriteService from '../appwrite/config';
import { Button } from './index';
import Swal from 'sweetalert2';

function DeleteAllPosts() {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const showAlert = () => {
        Swal.fire({
            title: 'Success!',
            text: 'All posts have been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'Okay'
        });
    };

    const deleteAllPosts = async () => {
        setDeleting(true);
        setError('');
        setSuccess('');

        try {
            const response = await appwriteService.getPosts();
            const posts = response.documents;

            for (const post of posts) {
                await appwriteService.deletePost(post.$id);
            }

            setSuccess('All posts have been deleted successfully.');
        } catch (error) {
            setError('An error occurred while deleting the posts.');
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="delete-all-posts">
            <Button
                text="Delete All Posts"
                onClick={()=>{deleteAllPosts(); showAlert();}}
                className="bg-red-600 w-full"
                disabled={deleting}

            />
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
        </div>
    );
}

export default DeleteAllPosts;
