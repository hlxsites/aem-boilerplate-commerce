/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
/**
 * Hook for managing user permissions
 *
 * This hook fetches permissions fresh on each use to ensure they're current.
 * Permissions can change during a session (role updates, admin changes, etc.),
 * so we don't cache them indefinitely.
 *
 * Usage:
 * ```tsx
 * const { permissions, loading, error } = usePermissions();
 *
 * if (loading) return <Spinner />;
 * if (error) return <ErrorDisplay error={error} />;
 *
 * return (
 *   <div>
 *     {permissions?.canEditUsers && <EditButton />}
 *     {permissions?.canViewUsers && <ViewButton />}
 *   </div>
 * );
 * ```
 */
export declare const usePermissions: () => {
    permissions: any;
    loading: boolean;
    error: Error | null;
    refreshPermissions: () => Promise<void>;
};
