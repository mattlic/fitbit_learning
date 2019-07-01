const colorSet = [
  {color: "black"},
  {color: "darkslategrey"},
  {color: "dimgrey"},
  {color: "grey"},
  {color: "lightgrey"},
  {color: "beige"},
  {color: "white"},
  {color: "maroon"},
  {color: "saddlebrown"},
  {color: "darkgoldenrod"},
  {color: "goldenrod"},
  {color: "rosybrown"},
  {color: "wheat"},
  {color: "navy"},
  {color: "blue"},
  {color: "dodgerblue"},
  {color: "deepskyblue"},
  {color: "aquamarine"},
  {color: "cyan"},
  {color: "olive"},
  {color: "darkgreen"},
  {color: "green"},
  {color: "springgreen"},
  {color: "limegreen"},
  {color: "palegreen"},
  {color: "lime"},
  {color: "greenyellow"},
  {color: "darkslateblue"},
  {color: "slateblue"},
  {color: "purple"},
  {color: "fuchsia"},
  {color: "plum"},
  {color: "orchid"},
  {color: "lavender"},
  {color: "darkkhaki"},
  {color: "khaki"},
  {color: "lemonchiffon"},
  {color: "yellow"},
  {color: "gold"},
  {color: "orangered"},
  {color: "orange"},
  {color: "coral"},
  {color: "lightpink"},
  {color: "palevioletred"},
  {color: "deeppink"},
  {color: "darkred"},
  {color: "crimson"},
  {color: "red"}       
];

const options = [  
  ['Time Color', 'colorTime'],
  ['Divider Color', 'colorDivider'],
  ['Day/Date Color', 'colorDate'],
  ['Data Text Color', 'colorDataText']
];

function mySettings(props) {
  return (
    <Page>
    <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      />

      <Section
        title={
          <Text>
            Transition times for parts of the day  (24 hour format)
          </Text>
        } >
        <TextInput
          title="Set Morning Start - 24 hour format"
          label="Morning time starts"
          settingsKey="morningTimeStart"
        />
        <TextInput
        title="Set Daytime Start - 24 hour format"
        label="Day time starts"
        settingsKey="dayTimeStart"
        />
        <TextInput
        title="Set Sunset Start - 24 hour format"
        label="Sunset starts"
        settingsKey="sunsetTimeStart"
        />
        <TextInput
        title="Set Night Time Start - 24 hour format"
        label="Night time starts"
        settingsKey="nightTimeStart"
        />
      </Section>

      {options.map(([title, settingsKey]) =>
        <Section
          title={title}>
          <ColorSelect
            settingsKey={settingsKey}
            colors={colorSet} />
        </Section>
      )}
    </Page>
  );
}

registerSettingsPage(mySettings);

