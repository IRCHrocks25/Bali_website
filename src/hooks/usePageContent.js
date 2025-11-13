import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const usePageContent = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContent = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'content')
            .single();

        if (error) {
            console.error('Error fetching page content:', error);
            setError('Could not load website content. Please try again later.');
            setContent({}); // Provide empty object on error
        } else {
            setContent(data.value);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    const updateContent = useCallback(async (newContent) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('website_content')
            .update({ value: newContent, updated_at: new Date().toISOString() })
            .eq('key', 'content')
            .select()
            .single();

        if (error) {
            console.error('Error updating content:', error);
            setError('Failed to save changes.');
            setLoading(false);
            return { error };
        }

        setContent(data.value);
        setLoading(false);
        return { data };
    }, []);

    return { content, loading, error, setContent, updateContent, refetch: fetchContent };
};