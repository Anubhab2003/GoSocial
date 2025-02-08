import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '../index'; // Updated import
import TinyMCEEditor from '../TinyMCEEditor'; // Import TinyMCEEditor
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            let fileId;
            if (data.image && data.image.length > 0) {
                const file = await appwriteService.uploadFile(data.image[0]);
                fileId = file.$id; // Get the fileId from the response
            }

            const requestData = {
                ...data,
                userId: userData?.$id,  // Ensure correct userId is included
                featuresImage: fileId || post?.featuresImage,
            };

            if (!requestData.userId) {
                throw new Error('Missing required attribute "userid"');
            }

            if (post) {
                const dbPost = await appwriteService.updatePost(post.$id, requestData);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!fileId) {
                    throw new Error('Missing required attribute "featuresImage"');
                }

                const dbPost = await appwriteService.createPost(requestData);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error('Submit Error:', error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '')
                .replace(/\s/g, '-');
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe(); // MEMORY MANAGEMENT AND OPTIMIZATION
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <TinyMCEEditor
                    value={getValues('content')}
                    onChange={(content) => setValue('content', content)}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && post.featuresImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuresImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />
                <Button type="submit" className="w-full bg-blue-600" text={post ? 'Update' : 'Submit'} />
            </div>
        </form>
    );
}

export default PostForm;
