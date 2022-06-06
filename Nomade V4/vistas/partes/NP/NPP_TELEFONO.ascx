<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPP_TELEFONO.ascx.vb" Inherits="vistas_partes_NP_NPP_TELEFONO" %>
<table width="700" border="0" cellspacing="0" cellpadding="1">
  
  <tr>
    <td>&nbsp;</td>
    <td align=right>
        <asp:ImageButton ID="ImageButton3" runat="server" ImageUrl="~/recursos/ico/n_nuevo.png" /><asp:Label
            ID="lbl_nuevotel" runat="server" Text="Nuevo"></asp:Label>
        <asp:ImageButton ID="ImageButton2" runat="server" ImageUrl="~/recursos/ico/n_lista.jpg" /><asp:Label
            ID="lbl_listatel" runat="server" Text="Listar"></asp:Label>
       
        </td>
  </tr>
  <tr>
    <td>Sequencia</td>
    <td>
        <asp:TextBox ID="txt_sequencia" runat="server" Width="15px"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Ubicacion</td>
    <td>
        <asp:DropDownList ID="dd_ubicacion" runat="server" AutoPostBack="True" 
            Width="120px">
        </asp:DropDownList>
    </td>
  </tr>
  <tr>
    <td>Area</td>
    <td>
        <asp:TextBox runat="server" Width="100px" ID="txt_area"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Numero</td>
    <td>
        <asp:TextBox runat="server" Width="150px" ID="txt_numero"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Anexo</td>
    <td>
        <asp:TextBox runat="server" Width="100px" ID="txt_anexo"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Acceso Interno</td>
    <td>
        <asp:TextBox runat="server" Width="150px" ID="txt_acceso_interno"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Comentario</td>
    <td>
        <asp:TextBox ID="txt_comentario" runat="server" Width="285px"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Estado</td>
    <td>
        <asp:CheckBox ID="chb_estado" runat="server" Checked="True" Text="Activo" />
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
        <asp:Button ID="Button2" runat="server" CssClass="boton" Text="Grabar" />
      </td>
  </tr>
            <tr>
                <td>
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
</table>