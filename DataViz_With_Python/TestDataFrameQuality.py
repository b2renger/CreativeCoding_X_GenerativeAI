import unittest
import pandas as pd

def test_dataframe_quality(df):

    columns_awaited = ['Unnamed: 0','Datetime','Tweet Id','Text','Username']
        
    result = {
        'is_empty': False,  # Initialize result dictionary with default values
        'missing_values': {},
        'missing_columns': []
    }
    
    # Check if the dataframe is empty
    if df.empty:
        result['is_empty'] = True
    
    # Identify missing values in each column
    missing_values = df.isnull().sum().to_dict()
    result['missing_values'] = missing_values
    
    # Identify missing columns
    missing_columns = [col for col in columns_awaited if col not in df.columns]
    result['missing_columns'] = missing_columns
    
    return result


class TestDataFrameQuality(unittest.TestCase):
    
    def setUp(self):
        # Create a sample dataframe for testing
        data = {
            'Unnamed: 0': [1, 2, 3],
            'Datetime': ['2021-01-01', '2021-01-02', '2021-01-03'],
            'Tweet Id': [123, 456, 789],
            'Text': ['Hello', 'World', 'Genie'],
            'Username': ['user1', 'user2', 'user3']
        }
        self.df = pd.DataFrame(data)
    
    def tearDown(self):
        # Clean up any resources used for testing (if necessary)
        pass
    
    def test_is_empty(self):
        # Test if the dataframe is empty
        empty_df = pd.DataFrame()
        result = test_dataframe_quality(empty_df)
        self.assertTrue(result['is_empty'])
        
        result = test_dataframe_quality(self.df)
        self.assertFalse(result['is_empty'])
    
    def test_missing_values(self):
        # Test if missing values are correctly identified
        self.df.loc[0, 'Username'] = None
        result = test_dataframe_quality(self.df)
        self.assertEqual(result['missing_values']['Username'], 1)
        self.assertEqual(result['missing_values']['Text'], 0)  # No missing values in this column
        
        # Add another column with missing values
        self.df['Location'] = [None, 'New York', 'London']
        result = test_dataframe_quality(self.df)
        self.assertEqual(result['missing_values']['Location'], 1)
    
    def test_missing_columns(self):
        # Test if missing columns are correctly identified
        test_df_missing_column = self.df.copy()
        del test_df_missing_column['Username']
        result = test_dataframe_quality(test_df_missing_column)
        self.assertEqual(result['missing_columns'], ['Username'])
        
        # Test when all expected columns are present
        result = test_dataframe_quality(self.df)
        self.assertEqual(result['missing_columns'], [])
    
if __name__ == '__main__':
    unittest.main()

