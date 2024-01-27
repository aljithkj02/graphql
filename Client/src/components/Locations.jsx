import { gql, useQuery } from "@apollo/client"
import { Box, Typography } from "@mui/material";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`
export const Locations = () => {
    const { error, data, loading } = useQuery(GET_LOCATIONS);

    if (loading) return <Typography textAlign="center" variant="h4" mt={10}>Loading...</Typography>;
    if (error) return <p>Error : {error.message}</p>;

    console.log({ data })
    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3} mx={10} my={4}>
            { data.locations.map((item) => {
                return <Box key={item.id} boxShadow="0 0 10px rgba(0, 0, 0, 0.5)" p={2} borderRadius={2}
                        display="flex" flexDirection="column" gap={1}
                    >
                        <Box height="300px">
                            <img src={item.photo} alt="location" style={{
                                width: "100%", height: "100%"
                            }}/>
                        </Box>
                        <Typography fontWeight="bold" fontSize="18px">{ item.name }</Typography>
                        <Typography>{ item.description }</Typography>
                    </Box>
            })}
        </Box>
    )
}
