import React from 'react';
import {
  Circle,
  Divider,
  ExpoImage,
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Supabase from '../custom-files/Supabase';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen6Feed = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [ActivePostId, setActivePostId] = React.useState('');
  const [MyPosts, setMyPosts] = React.useState('');
  const [PostComments, setPostComments] = React.useState([]);
  const [add_description, setAdd_description] = React.useState('');
  const [show_comments_popup, setShow_comments_popup] = React.useState(false);
  const AddComment = async () => {
    const supabase = Supabase.getSupabase();

    if (!ActivePostId) {
      console.log('add_comment: missing postId');
      return null;
    }

    if (!add_description) {
      console.log('add_comment: empty description');
      return null;
    }

    const { data, error } = await supabase.rpc('add_comment', {
      p_post_id: ActivePostId,
      p_description: add_description,
    });
    if (error) {
      console.log('add_comment error:', error);
      return null;
    }

    // returns new comment
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return null;

    const updatedPostComments = Array.isArray(PostComments)
      ? [...PostComments, row]
      : [row];
    setPostComments(updatedPostComments);

    console.log('Comment added:', row);
    return row;
  };

  const GetMyPosts = async () => {
    const supabase = Supabase.getSupabase();

    const { data, error } = await supabase.rpc('get_my_posts');
    if (error) {
      console.log('get_my_posts error:', error);
      return null;
    }

    setMyPosts(data);
    console.log('MyPosts updated:', data);

    return data;
  };

  const GetPostComments = async () => {
    const supabase = Supabase.getSupabase();

    if (!ActivePostId) {
      console.log('get_post_comments: missing postId');
      return null;
    }

    const { data, error } = await supabase.rpc('get_post_comments', {
      p_post_id: ActivePostId,
    });
    if (error) {
      console.log('get_post_comments error:', error);
      return null;
    }

    setPostComments(data);
    console.log('PostComments updated:', data);

    return data;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await GetMyPosts();
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          gap: 24,
          marginBottom: 24,
          marginTop: 8,
          paddingLeft: 16,
          paddingRight: 16,
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['1_Locals'].Canvas,
            height: 30,
            justifyContent: 'center',
            width: '100%',
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text'].style,
              theme.typography.body1,
              {}
            ),
            dimensions.width
          )}
        >
          {'Locals'}
        </Text>
      </View>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        enableOnAndroid={true}
        style={StyleSheet.applyWidth(
          { alignItems: 'center', width: '100%' },
          dimensions.width
        )}
      >
        {/* List Posts */}
        <SimpleStyleFlatList
          data={MyPosts}
          decelerationRate={'normal'}
          horizontal={false}
          inverted={false}
          keyExtractor={(listPostsData, index) =>
            listPostsData?.id ??
            listPostsData?.uuid ??
            index?.toString() ??
            JSON.stringify(listPostsData)
          }
          keyboardShouldPersistTaps={'never'}
          listKey={'Keyboard Aware Scroll View->List Posts'}
          nestedScrollEnabled={false}
          numColumns={1}
          onEndReachedThreshold={0.5}
          pagingEnabled={false}
          renderItem={({ item, index }) => {
            const listPostsData = item;
            return (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', alignSelf: 'center', width: '100%' },
                  dimensions.width
                )}
              >
                {/* PostCard */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderBottomWidth: 1,
                      borderColor: palettes['1_Locals'].BrandGreen100,
                      borderLeftWidth: 1,
                      borderRadius: 12,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      gap: 10,
                      maxWidth: 360,
                      minHeight: 140,
                      paddingBottom: 14,
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 14,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* PostCreator */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        flexDirection: 'row',
                        gap: 10,
                        minHeight: 36,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { overflow: 'hidden' },
                        dimensions.width
                      )}
                    >
                      <Circle
                        {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.CircleStyles(theme)['Circle'].style,
                            { height: 40, overflow: 'hidden', width: 40 }
                          ),
                          dimensions.width
                        )}
                      >
                        <ExpoImage
                          allowDownscaling={true}
                          cachePolicy={'disk'}
                          contentPosition={'center'}
                          resizeMode={'cover'}
                          transitionDuration={300}
                          transitionEffect={'cross-dissolve'}
                          transitionTiming={'ease-in-out'}
                          {...GlobalStyles.ExpoImageStyles(theme)['Image']
                            .props}
                          source={imageSource(
                            listPostsData?.creator_avatar_url
                          )}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ExpoImageStyles(theme)['Image']
                                .style,
                              { height: '100%', width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                      </Circle>
                    </View>

                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, gap: 2, marginLeft: 16 },
                        dimensions.width
                      )}
                    >
                      {/* Name */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Feed text 1'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Feed text 1'].style,
                            { fontFamily: 'Inter_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {listPostsData?.creator_name}
                      </Text>
                      {/* Time */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes['1_Locals']['BrandGreen500 '],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 13,
                            marginTop: 4,
                          },
                          dimensions.width
                        )}
                      >
                        {listPostsData?.time_ago}
                      </Text>
                    </View>
                  </View>
                  {/* Description */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignSelf: 'stretch',
                        marginTop: 12,
                        minHeight: 66,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes['1_Locals'].BrandGreen700,
                          fontFamily: 'Inter_400Regular',
                          fontSize: 15,
                          lineHeight: 22,
                        },
                        dimensions.width
                      )}
                    >
                      {listPostsData?.description}
                    </Text>
                  </View>
                  {/* Comment button */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginLeft: 16,
                        },
                        dimensions.width
                      )}
                    >
                      <IconButton
                        onPress={() => {
                          try {
                            setShow_comments_popup(true);
                            setActivePostId(listPostsData?.post_id);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes['1_Locals']['BrandGreen500 ']}
                        icon={'FontAwesome/comment'}
                        size={28}
                        style={StyleSheet.applyWidth(
                          { marginRight: 3, marginTop: 10 },
                          dimensions.width
                        )}
                      />
                      {/* Number */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes['1_Locals']['BrandGreen500 '],
                            fontFamily: 'Inter_500Medium',
                            fontSize: 13,
                            marginLeft: 4,
                            marginTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {listPostsData?.comments_number}
                      </Text>
                    </View>
                  </View>
                  {/* CommentsSection */}
                  <>
                    {!show_comments_popup ? null : (
                      <View
                        onLayout={event => {
                          const handler = async () => {
                            try {
                              await GetPostComments();
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        style={StyleSheet.applyWidth(
                          {
                            alignSelf: 'stretch',
                            backgroundColor: palettes.Brand.Surface,
                            borderBottomWidth: 1,
                            borderColor: theme.colors.border.brand,
                            borderLeftWidth: 1,
                            borderRadius: 12,
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            gap: 7,
                            paddingBottom: 16,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 8,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'stretch',
                              flexDirection: 'row',
                              gap: 8,
                              paddingBottom: 4,
                              paddingTop: 4,
                            },
                            dimensions.width
                          )}
                        >
                          <IconButton
                            onPress={() => {
                              try {
                                setShow_comments_popup(false);
                                setActivePostId('');
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            color={palettes['1_Locals'].BrandGreen600}
                            icon={'AntDesign/close'}
                            size={24}
                          />
                        </View>
                        <SimpleStyleFlatList
                          data={PostComments}
                          decelerationRate={'normal'}
                          horizontal={false}
                          inverted={false}
                          keyExtractor={(listData, index) =>
                            listData?.id ??
                            listData?.uuid ??
                            index?.toString() ??
                            JSON.stringify(listData)
                          }
                          keyboardShouldPersistTaps={'never'}
                          listKey={JSON.stringify(PostComments)}
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          pagingEnabled={false}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <>
                                {/* Comment */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'stretch',
                                      backgroundColor:
                                        palettes.App['Custom #ffffff'],
                                      borderBottomWidth: 1,
                                      borderColor:
                                        palettes['1_Locals'].BrandGreen100,
                                      borderLeftWidth: 1,
                                      borderRadius: 12,
                                      borderRightWidth: 1,
                                      borderTopWidth: 1,
                                      flexDirection: 'row',
                                      gap: 10,
                                      paddingBottom: 12,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 12,
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Avatar */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { overflow: 'hidden' },
                                      dimensions.width
                                    )}
                                  >
                                    <Circle
                                      {...GlobalStyles.CircleStyles(theme)[
                                        'Circle'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.CircleStyles(theme)[
                                            'Circle'
                                          ].style,
                                          {
                                            height: 32,
                                            overflow: 'hidden',
                                            width: 32,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      <ExpoImage
                                        allowDownscaling={true}
                                        cachePolicy={'disk'}
                                        contentPosition={'center'}
                                        resizeMode={'cover'}
                                        transitionDuration={300}
                                        transitionEffect={'cross-dissolve'}
                                        transitionTiming={'ease-in-out'}
                                        {...GlobalStyles.ExpoImageStyles(theme)[
                                          'Image'
                                        ].props}
                                        source={imageSource(
                                          listData?.creator_avatar_url
                                        )}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.ExpoImageStyles(theme)[
                                              'Image'
                                            ].style,
                                            { height: '100%', width: '100%' }
                                          ),
                                          dimensions.width
                                        )}
                                      />
                                    </Circle>
                                  </View>

                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignSelf: 'stretch',
                                        flex: 1,
                                        gap: 4,
                                        marginLeft: 12,
                                        width: '100%',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Name */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignSelf: 'stretch',
                                          color:
                                            palettes['1_Locals'].BrandGreen700,
                                          fontFamily: 'Inter_500Medium',
                                          fontSize: 14,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.creator_name}
                                    </Text>
                                    {/* Description */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignSelf: 'stretch',
                                          color:
                                            palettes['1_Locals'].BrandGreen700,
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 14,
                                          lineHeight: 20,
                                          marginTop: 8,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.description}
                                    </Text>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          marginTop: 8,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignSelf: 'stretch',
                                            color:
                                              palettes['1_Locals'][
                                                'BrandGreen500 '
                                              ],
                                            fontFamily: 'Inter_300Light',
                                            fontSize: 12,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.time_ago}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </>
                            );
                          }}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                          snapToAlignment={'start'}
                          style={StyleSheet.applyWidth(
                            { alignSelf: 'stretch', gap: 12 },
                            dimensions.width
                          )}
                        />
                        {/* Add comment */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'stretch',
                              flexDirection: 'row',
                              gap: 8,
                              marginTop: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Avatar */}
                          <View
                            style={StyleSheet.applyWidth(
                              { overflow: 'hidden' },
                              dimensions.width
                            )}
                          >
                            <Circle
                              {...GlobalStyles.CircleStyles(theme)['Circle']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.CircleStyles(theme)['Circle']
                                    .style,
                                  { height: 32, overflow: 'hidden', width: 32 }
                                ),
                                dimensions.width
                              )}
                            >
                              <ExpoImage
                                allowDownscaling={true}
                                cachePolicy={'disk'}
                                contentPosition={'center'}
                                resizeMode={'cover'}
                                transitionDuration={300}
                                transitionEffect={'cross-dissolve'}
                                transitionTiming={'ease-in-out'}
                                {...GlobalStyles.ExpoImageStyles(theme)['Image']
                                  .props}
                                source={imageSource(Constants['AvatarImage'])}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ExpoImageStyles(theme)['Image']
                                      .style,
                                    { height: '100%', width: '100%' }
                                  ),
                                  dimensions.width
                                )}
                              />
                            </Circle>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                borderRadius: 8,
                                flex: 1,
                                flexDirection: 'row',
                                gap: 8,
                              },
                              dimensions.width
                            )}
                          >
                            <TextInput
                              autoCapitalize={'none'}
                              autoCorrect={true}
                              changeTextDelay={500}
                              onChangeText={newTextInputValue => {
                                try {
                                  setAdd_description(newTextInputValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              webShowOutline={true}
                              multiline={true}
                              placeholder={'Your reply...'}
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: 'stretch',
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                  borderBottomWidth: 1,
                                  borderColor:
                                    palettes['1_Locals'].BrandGreen100,
                                  borderLeftWidth: 1,
                                  borderRadius: 12,
                                  borderRightWidth: 1,
                                  borderTopWidth: 1,
                                  color: palettes['1_Locals'].BrandGreen700,
                                  flex: 1,
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 14,
                                  height: 60,
                                  paddingBottom: 12,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 12,
                                },
                                dimensions.width
                              )}
                            />
                            <IconButton
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    await AddComment();
                                    setAdd_description('');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              size={32}
                              color={palettes['1_Locals'].BrandGreen600}
                              icon={
                                'MaterialCommunityIcons/send-circle-outline'
                              }
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                  <Divider
                    color={theme.colors.border.base}
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { marginTop: 8 }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          snapToAlignment={'start'}
          style={StyleSheet.applyWidth(
            { gap: 16, maxWidth: 360, width: '100%' },
            dimensions.width
          )}
        />
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen6Feed);
