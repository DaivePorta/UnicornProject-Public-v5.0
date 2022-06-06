<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPP_CORREO.ascx.vb" Inherits="vistas_partes_NP_NPP_CORREO" %>
 <table width="900" border="0" cellspacing="0" cellpadding="1">
  
  <tr>
    <td>Sequencia</td>
    <td>
        <asp:TextBox runat="server" Width="15px" ID="TextBox6"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Ubicacion</td>
    <td>
        <asp:DropDownList ID="DropDownList7" runat="server" Width="120px" 
            AutoPostBack="True">
        </asp:DropDownList>
    </td>
  </tr>
  <tr>
    <td>Correo</td>
    <td>
        <asp:TextBox runat="server" Width="285px" ID="txt_correo"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Comentario</td>
    <td>
        <asp:TextBox runat="server" Width="285px" ID="TextBox7"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Web</td>
    <td>
        <asp:CheckBox ID="chb_web" runat="server" Checked="True" Text="Si" />
    </td>
  </tr>
  <tr>
    <td>Preferido</td>
    <td>
        <asp:CheckBox ID="chb_preferido" runat="server" Checked="True" Text="Si" />
    </td>
  </tr>
  <tr>
    <td>Estado</td>
    <td>
        <asp:CheckBox ID="CheckBox3" runat="server" Checked="True" Text="Activo" />
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        &nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        <asp:Button ID="Button4" runat="server" Text="Grabar" CssClass="boton" />
            </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        &nbsp;</td>
  </tr>
</table>