import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites"
          subtitle="Looks like you have no favorite listing"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient
       listings={listings}
       currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
