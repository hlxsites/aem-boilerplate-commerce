import { FunctionComponent } from 'preact';
import { Wishlist, WishlistAddItemInput } from '../types/interface';

export interface WishlistAttributesContext {
    isAuthorized: boolean;
    wishlist: Wishlist | undefined;
    allWishlist: Wishlist[] | [];
    addItemToWishlist: (wishlistId: string, wishlistItem: WishlistAddItemInput) => void;
    removeItemFromWishlist: (wishlistId: string, wishlistItemIds: string) => void;
}
declare const useWishlist: () => WishlistAttributesContext;
declare const WishlistProvider: FunctionComponent;
export { useWishlist, WishlistProvider };
//# sourceMappingURL=wishlist.d.ts.map